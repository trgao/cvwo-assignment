class Post < ApplicationRecord
  include PgSearch::Model
  pg_search_scope :search_by_title, against: {
      title: 'A', 
      body: 'B'
  }, using: {tsearch: {prefix: true}}

  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  belongs_to :user
  has_and_belongs_to_many :tags

  validates :title, presence: true
  validates :body, presence: true
  validates :user_id, presence: true
  validates :author, presence: true

  def liked?(user)
      !!self.likes.find{|like| like.user_id == user.id}
  end
end
