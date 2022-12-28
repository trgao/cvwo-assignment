class RemoveTimestampFromPosts < ActiveRecord::Migration[7.0]
  def change
    remove_column :posts, :timestamp, :datetime
  end
end
