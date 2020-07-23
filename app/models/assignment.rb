class Assignment < ApplicationRecord
  belongs_to :chapter
  validates :question, :points, :due_date, presence: true
end
