class Api::V1::LikesController < ApplicationController
  before_action :set_post, only: %i[create destroy]
  before_action :set_user, only: %i[create destroy]

  # GET /likes
  def index
    @likes = Like.all
    
    render json: @likes.to_json
  end

  # POST /likes?post_id=:post_id&user_id=:user_id
  def create
    like = Like.create(post_id: params[:post_id], user_id: params[:user_id])
    @post.likes << like
  end

  # DESTROY /likes?post_id=:post_id&user_id=:user_id
  def destroy
    like = Like.find_by(post_id: params[:post_id], user_id: params[:user_id])
    like.destroy
  end

  private
  def set_post
    @post = Post.find(params[:post_id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end
end