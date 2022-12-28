class RemoveTimestampFromComments < ActiveRecord::Migration[7.0]
  def change
    remove_column :comments, :timestamp, :datetime
  end
end
