class NotebooksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_notebooks
  before_action :set_notebook, only: [:show, :edit, :update, :destroy]

  def index
    if(@notebooks.count > 0)
      redirect_to notebook_notes_path(@notebooks.first)
    else
      redirect_to new_notebook_path
    end
  end

  def new
    @notebook = current_user.notebooks.new
  end

  def edit
  end

  def create
    @notebook = current_user.notebooks.new(notebook_params)

    if @notebook.save
      redirect_to notebook_notes_path(@notebook), notice: 'Notebook was successfully created.'
    else
      render :new
    end
  end

  def update
    if @notebook.update(notebook_params)
      redirect_to notebook_notes_path(@notebook), notice: 'Notebook was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @notebook.destroy
    redirect_to notebooks_path, notice: 'Notebook was successfully deleted.'
  end

  private
    def set_notebook
      @notebook = current_user.notebooks.find(params[:id])
    end

    def set_notebooks
      @notebooks = current_user.notebooks.includes(:notes).order("created_at DESC")
    end

    def notebook_params
      params.require(:notebook).permit(:title)
    end
end
