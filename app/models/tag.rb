class Tag < ApplicationRecord
  include PgSearch::Model
  pg_search_scope :search_by_name, against: :name, using: {tsearch: {prefix: true}}

  has_and_belongs_to_many :posts
end
