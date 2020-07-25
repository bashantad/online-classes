class CourseContent < ApplicationRecord
  belongs_to :chapter
  has_rich_text :description
  validates :title, :description, presence: true
end
