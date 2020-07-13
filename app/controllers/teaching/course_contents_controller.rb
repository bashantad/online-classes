class Teaching::CourseContentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course
  before_action :set_course_content, only: [:show, :edit, :update, :destroy]

  def new
    @course_content = @course.course_contents.new
  end

  def edit
  end

  def create
    @course_content = @course.course_contents.new(course_content_params)

    respond_to do |format|
      if @course_content.save
        format.html { redirect_to teaching_course_path(@course), notice: 'Course content was successfully created.' }
        format.json { render :show, status: :created, location: @course_content }
      else
        format.html { render :new }
        format.json { render json: @course_content.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @course_content.update(course_content_params)
        format.html { redirect_to teaching_course_path(@course), notice: 'Course content was successfully updated.' }
        format.json { render :show, status: :ok, location: @course_content }
      else
        format.html { render :edit }
        format.json { render json: @course_content.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @course_content.destroy
    respond_to do |format|
      format.html { redirect_to teaching_course_path(@course), notice: 'Course content was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_course_content
      @course_content = @course.course_contents.find(params[:id])
    end

    def set_course
      @course = current_user.courses.find(params[:course_id])
    end

    def course_content_params
      params.require(:course_content).permit(:title, :description, :duration)
    end
end
