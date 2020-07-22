class CourseContent < ApplicationRecord
  belongs_to :chapter
  validates :title, presence: true
end
