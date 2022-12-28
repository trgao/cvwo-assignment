class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :body
      t.datetime :timestamp
      t.integer :likes
      t.integer :dislikes
      t.string :user

      t.timestamps
    end
  end
end
