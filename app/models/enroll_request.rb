class EnrollRequest < ApplicationRecord
  belongs_to :user
  belongs_to :course
  validates :email, presence: true
end
