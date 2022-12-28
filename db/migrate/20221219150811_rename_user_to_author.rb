class RenameUserToAuthor < ActiveRecord::Migration[7.0]
  def change
    rename_column :comments, :user, :author
  end
end
