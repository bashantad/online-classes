class QualificationSerializer < ActiveModel::Serializer
  attributes :id, :name_of_institution, :string, :year_start, :year_end, :title, :location, :country, :type
end
