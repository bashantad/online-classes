class Chapter < ApplicationRecord
  belongs_to :course
  has_many :course_contents
  validates :title, presence: true
end
