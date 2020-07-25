class Note < ApplicationRecord
  belongs_to :user
  belongs_to :notebook
  has_rich_text :description
  validates :title, :description, presence: true
end
