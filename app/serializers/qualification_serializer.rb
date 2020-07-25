class QualificationSerializer < ApplicationSerializer
  attributes :id, :name_of_institution, :year_start, :year_end, :title, :location, :country, :type
end
