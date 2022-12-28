class FixLikes < ActiveRecord::Migration[7.0]
  def change
    remove_column :posts, :likes, :integer
    add_column :posts, :likes_count, :integer
  end
end
