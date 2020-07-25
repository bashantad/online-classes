class Assignment < ApplicationRecord
  belongs_to :chapter
  has_rich_text :instructions
  validates :question, :points, :due_date, presence: true
end
