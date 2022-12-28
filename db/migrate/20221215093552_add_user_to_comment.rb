class AddUserToComment < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :user, :string
  end
end
