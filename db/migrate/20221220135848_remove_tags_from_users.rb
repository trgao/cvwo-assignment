class RemoveTagsFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :posts, :tags, :text

    create_table :tags do |t|
      t.string :name
      t.timestamps
    end

    create_table :posts_tags, id: false do |t|
      t.belongs_to :post
      t.belongs_to :tag
    end
  end
end
