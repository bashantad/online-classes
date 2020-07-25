class NoteSerializer < ApplicationSerializer
  attributes :id, :title, :description_html
  has_one :user
  has_one :notebook
end
