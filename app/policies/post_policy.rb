class PostPolicy
  # ensures user editing post thread is the user that posted thread
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def update?
    user.id == post.user_id
  end

  def destroy?
    user.id == post.user_id
  end
end