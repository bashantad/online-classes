class CourseContent < ApplicationRecord
  belongs_to :course
  validates :title, :description, :duration, presence: true
end
