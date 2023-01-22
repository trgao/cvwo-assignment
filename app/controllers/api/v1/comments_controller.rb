class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_comment, only: %i[ show update destroy ]

  # GET /comments
  def index
    # custom order of comments
    if params.has_key?(:order)
      if params[:order] == 'Top'
        @order = 'likes_count DESC'
      elsif params[:order] == 'Newest'
        @order = 'created_at DESC'
      elsif params[:order] == 'Oldest'
        @order = 'created_at ASC'
      end
    else
      @order = 'created_at DESC'
    end

    if params.has_key?(:post_id)
      @comments = Comment.where(post_id: params[:post_id]).all.order(@order).limit(10).offset(params[:offset])

      render json: @comments.to_json
    else
      @comments = Comment.order(@order).limit(10).offset(params[:offset])

      render json: @comments.to_json
    end
  end

  # GET /comments/1
  def show
    render json: @commentt.to_json
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    authorize @comment
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    authorize @comment
    @comment.destroy
  end

  private
    def set_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:body, :post_id, :user_id, :author)
    end
  end