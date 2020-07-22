class Note < ApplicationRecord
  belongs_to :user
  belongs_to :notebook
  validates :title, :description, presence: true
end
