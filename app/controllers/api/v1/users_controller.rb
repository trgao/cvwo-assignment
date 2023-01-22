class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]
  before_action :authenticate_user!, except: [:index, :show]

  # GET /users
  def index
    if params.has_key?(:q)
      @users = User.search_by_username(params[:q]).limit(5).offset(params[:offset])
    else
      @users = User.all
    end

    render json: @users.to_json(except: :email)
  end

  # GET /users/:username
  def show
    render json: @user.to_json(except: :email)
  end

  # update username
  def update
    if @user.update(user_params)
      # changes username and author field of posts
      @posts = Post.where(:user_id => @user.id)
      @posts.each do |post|
        post.update(:author => @user.username)
      end
      
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/:username
  def destroy
    @user.destroy
  end

  private
  def set_user
    @user = User.find_by_username(params[:id])
  end

  def user_params
    params.require(:user).permit(:id, :username)
  end
end