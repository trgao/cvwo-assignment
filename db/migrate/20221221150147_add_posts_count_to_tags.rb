class AddPostsCountToTags < ActiveRecord::Migration[7.0]
  def change
    add_column :tags, :posts_count, :integer
  end
end
