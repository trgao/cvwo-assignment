class Api::V1::PostsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
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

    if params.has_key?(:author)
      @posts = Post.where(author: params[:author]).order(@order).limit(10).offset(params[:offset])
    elsif params.has_key?(:q)
      @posts = Post.order(@order).search_by_title(params[:q]).limit(10).offset(params[:offset])
    else
      @posts = Post.order(@order).limit(10).offset(params[:offset])
    end

    render json: @posts.to_json(include: :tags)
  end

  # GET /posts/1:user_id
  def show
    if params.has_key?(:user_id)
      render json: {
        title: @post.title, 
        body: @post.body, 
        created_at: @post.created_at, 
        updated_at: @post.updated_at, 
        author: @post.author, 
        user_id: @post.user_id, 
        tags: @post.tags, 
        likes_count: @post.likes_count, 
        comments_count: @post.comments_count, 
        liked: @post.liked?(User.find(params[:user_id]))
      }
    else
      render json: @post.to_json(include: :tags)
    end
  end

  # POST /posts
  def create
    @post = Post.new(post_params)
    tagArray = JSON.parse(params[:tags])

    tagArray.each do |tag|
      #checks if tag exists to associate to post, if not create a new tag and associate to post
      if Tag.exists?(name: tag)
        myTag = Tag.find_by_name(tag)
        @post.tags << myTag
      else
        myTag = Tag.new(name: tag)
        @post.tags << myTag
      end
    end

    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    authorize @post

    oldTags = @post.tags
    newTags = JSON.parse(params[:tags])

    oldTags.each do |tag|
      #checks if tag is in not new tags array and removes association
      if !newTags.include?(tag)
        @post.tags.delete(tag)
      end
    end

    newTags.each do |tag|
      #checks if tag exists to update, if not create a new tag and associate to post
      if Tag.exists?(name: tag)
        myTag = Tag.find_by_name(tag)
        @post.tags << myTag
      else
        myTag = Tag.new(name: tag)
        @post.tags << myTag
      end
    end

    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    authorize @post
    @post.destroy
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :body, :user_id, :author)
    end
end