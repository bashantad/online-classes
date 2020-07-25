class NotebookSerializer < ApplicationSerializer
  attributes :id, :title
  has_one :user
  has_many :notes
end
