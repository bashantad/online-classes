class NoteSerializer < ActiveModel::Serializer
  attributes :id, :title, :description
  has_one :user
  has_one :notebook
end
