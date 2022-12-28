class AddCommentsCountToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :comments_count, :integer
    change_column_default :posts, :comments_count, 0
  end
end
