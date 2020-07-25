class ReviewSerializer < ApplicationSerializer
  attributes :id, :comment, :rating, :created_at
  belongs_to :user
end
