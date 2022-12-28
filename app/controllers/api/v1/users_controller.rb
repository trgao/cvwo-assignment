class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[ show destroy ]
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

  # DELETE /users/:username
  def destroy
    @user.destroy
  end

  private
  def set_user
    @user = User.find_by_username(params[:id])
  end
end