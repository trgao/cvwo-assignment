class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  include PgSearch::Model
  pg_search_scope :search_by_username, against: :username, using: {tsearch: {prefix: true}}

  has_many :posts
  has_many :comments
  has_many :likes
  devise :database_authenticatable, :registerable, :recoverable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  validates_uniqueness_of :username
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
