class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :rating, :created_at
  belongs_to :user
end
