class RemovePostsCountFromTags < ActiveRecord::Migration[7.0]
  def change
    remove_column :tags, :posts_count, :integer
  end
end
