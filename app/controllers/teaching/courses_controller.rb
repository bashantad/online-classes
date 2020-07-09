class Teaching::CoursesController < ApplicationController
  layout :set_layout
  before_action :authenticate_user!, except: [:show]
  before_action :set_course, only: [:edit, :update, :destroy]
  before_action :set_categories, only: [:new, :create, :edit, :update]

  def index
    @courses = current_user.courses.includes(:category)
  end

  def show
    @course = Course.find(params[:id])
  end

  def new
    @course = current_user.courses.new
  end

  def edit
  end

  def start_journey

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

  private
  def set_course
    @course = current_user.courses.find(params[:id])
  end

  def course_params
    params.require(:course).permit(:title, :body, :website, :course_for, :price, :category_id, :cover_image)
  end

  def set_categories
    @categories = Category.active
  end

  def set_layout
    "theme"
  end
end
