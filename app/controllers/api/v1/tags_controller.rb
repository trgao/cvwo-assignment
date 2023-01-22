class Api::V1::TagsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_tag, only: %i[ show update destroy ]

  # GET /tags
  def index
    if params.has_key?(:q)
      @tags = Tag.search_by_name(params[:q]).limit(5).offset(params[:offset]).select{ |tag| tag.posts.size != 0 }
    else
      #order tags by descending count of posts, ignoring tags with 0 posts
      @tags = Tag.left_joins(:posts).group(:id).order('COUNT(posts.id) DESC').limit(10).select{ |tag| tag.posts.size != 0 }
    end

    render json: @tags.to_json
  end

  # GET /tags/:name
  def show
    # custom order of posts
    if params.has_key?(:order)
      if params[:order] == 'Top'
        @order = 'likes_count DESC'
      elsif params[:order] == 'Discussion'
        @order = 'comments_count DESC'
      elsif params[:order] == 'Newest'
        @order = 'created_at DESC'
      elsif params[:order] == 'Oldest'
        @order = 'created_at ASC'
      end
    else
      @order = 'created_at DESC'
    end

    render json: @tag.posts.order(@order).to_json(include: :tags)
  end

  private
    def set_tag
      @tag = Tag.find_by_name(params[:id])
    end
end