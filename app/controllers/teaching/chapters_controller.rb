class Teaching::ChaptersController < Teaching::BaseController
  before_action :set_owned_course
  before_action :set_chapter, only: [:show, :edit, :update, :destroy]

  def new
    @chapter = @course.chapters.new
  end

  def edit
  end

  def show
  end

  def create
    @chapter = @course.chapters.new(chapter_params)

    if @chapter.save
      redirect_to new_teaching_course_chapter_course_content_path(@course, @chapter), notice: 'Chapter was successfully created.'
    else
      render :new
    end
  end

  def update
    if @chapter.update(chapter_params)
      redirect_to new_teaching_course_chapter_course_content_path(@course, @chapter), notice: 'Chapter was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @chapter.destroy
    redirect_to teaching_course_path(@course), notice: 'Chapter was successfully deleted.'
  end

  private
  def set_chapter
    @chapter = @course.chapters.find(params[:id])
  end

  def chapter_params
    params.require(:chapter).permit(:title)
  end
end
