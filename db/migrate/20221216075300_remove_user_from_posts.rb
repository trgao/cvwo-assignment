class RemoveUserFromPosts < ActiveRecord::Migration[7.0]
  def change
    remove_column :posts, :user, :string
  end
end
