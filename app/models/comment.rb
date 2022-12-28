class Comment < ApplicationRecord
  belongs_to :post, counter_cache: :comments_count
  belongs_to :user

  validates :body, presence: true
  validates :post_id, presence: true
  validates :user_id, presence: true
  validates :author, presence: true
end
