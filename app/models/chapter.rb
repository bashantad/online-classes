class Chapter < ApplicationRecord
  belongs_to :course
  has_many :course_contents
  has_many :assignments
  validates :title, presence: true
end
