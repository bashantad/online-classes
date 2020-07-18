class Teaching::CoursesController < Teaching::BaseController
  before_action :authenticate_user!, except: [:show, :start_teaching]
  before_action :set_course, only: [:edit, :update, :destroy, :enrollment, :enroll_users, :enrollment_requests]
  before_action :set_categories, only: [:new, :create, :edit, :update]

  def index
    @courses = current_user.courses.includes(:category)
  end

  def show
    @course = Course.find(params[:id])
    @course_contents = @course.course_contents
  end

  def new
    @course = current_user.courses.new
  end

  def edit
  end

  def start_teaching
    if user_signed_in? && !current_user.has_qualifications?
      redirect_to REACT_ROUTES[:qualifications]
    end
  end

  def create
    @course = current_user.courses.new(course_params)

    respond_to do |format|
      if @course.save
        format.html { redirect_to teaching_courses_path, notice: 'Course was successfully created.' }
        format.json { render json: @course, status: :created }
      else
        format.html { render :new }
        format.json { render json: @course.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @course.update(course_params)
        format.html { redirect_to teaching_courses_path, notice: 'Course was successfully updated.' }
        format.json { render json: @course, status: :updated }
      else
        format.html { render :edit }
        format.json { render json: @course.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @course.destroy
    respond_to do |format|
      format.html { redirect_to teaching_courses_url, notice: 'Course was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  def enrollment

  end

  def enroll_users
    records_created = []
    records_failed = []
    params[:enroll_request].each do |key, enroll_request_params|
      enroll_request = @course.enroll_requests.create(allowed_enroll_request_params(enroll_request_params))
      if enroll_request.persisted?
        records_created << enroll_request.email
      else
        records_failed << enroll_request.email
      end
    end
    created_count = records_created.count
    flash[:notice] = "#{created_count} #{'request'.pluralize(created_count)} #{created_count == 1 ? 'is' : 'are'} sent(#{records_created.join(", ")}). #{records_failed.count} didn't succeed."
    redirect_to teaching_course_enrollment_requests_path(@course)
  end

  def enrollment_requests
    @enroll_user_requests = @course.enroll_requests
  end

  private
  def set_course
    @course = current_user.courses.find(params[:id] || params[:course_id])
  end

  def allowed_enroll_request_params(enroll_request_params)
    enroll_request_params.permit(:full_name, :email, :phone)
  end

  def course_params
    params.require(:course).permit(:title, :body, :website, :course_for, :price, :category_id, :cover_image, :short_description, :course_highlights, :duration, :no_of_lessons, :level)
  end

  def set_categories
    @categories = Category.active
    @levels = [["All levels", ""], ["Beginner", "Beginner"], ["Advanced", "Advanced"], ["Intermediate", "Intermediate"]]
  end
end
