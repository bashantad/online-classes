class Teaching::AssignmentsController < Teaching::BaseController
  before_action :set_course_and_chapter
  before_action :set_assignment, only: [:show, :edit, :update, :destroy, :answers]

  def index
    @assignments = @chapter.assignments
  end

  def show
  end

  def new
    @assignment = @chapter.assignments.new
  end

  def edit
  end

  def create
    @assignment = @chapter.assignments.new(assignment_params)
    if @assignment.save
      redirect_to teaching_course_path(@course), notice: 'Assignment was successfully created.'
    else
      render :new
    end
  end

  def update
    if @assignment.update(assignment_params)
      redirect_to teaching_course_path(@course), notice: 'Assignment was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @assignment.destroy
    redirect_to teaching_course_path(@course), notice: 'Assignment was successfully deleted.'
  end

  def answers

  end

  private
  def set_assignment
    assignment_id = params[:id] || params[:assignment_id]
    @assignment = @chapter.assignments.find(assignment_id)
  end

  def assignment_params
    params.require(:assignment).permit(:question, :instructions, :points, :due_date, :chapter_id)
  end
end
