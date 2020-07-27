class ApplicationSerializer < ActiveModel::Serializer
  def enrolled_course_user?
    object.chapter.course.enrolled_user_ids.include?(current_user&.id)
  end
end
