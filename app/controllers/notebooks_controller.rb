class NotebooksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_notebook, only: [:show, :edit, :update, :destroy]

  def index
    @notebooks = current_user.notebooks.order("created_at DESC")
    if(@notebooks.count > 0)
      notebook_notes_path(@notebooks.first)
    else
      new_notebook_path
    end
  end

  def new
    @notebook = current_user.notebooks.new
  end

  def edit
  end

  def create
    @notebook = current_user.notebooks.new(notebook_params)

    respond_to do |format|
      if @notebook.save
        format.html { redirect_to @notebook, notice: 'Notebook was successfully created.' }
        format.json { render :show, status: :created, location: @notebook }
      else
        format.html { render :new }
        format.json { render json: @notebook.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @notebook.update(notebook_params)
        format.html { redirect_to @notebook, notice: 'Notebook was successfully updated.' }
        format.json { render :show, status: :ok, location: @notebook }
      else
        format.html { render :edit }
        format.json { render json: @notebook.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @notebook.destroy
    respond_to do |format|
      format.html { redirect_to notebooks_url, notice: 'Notebook was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private
    def set_notebook
      @notebook = current_user.notebooks.find(params[:id])
    end

    def notebook_params
      params.require(:notebook).permit(:title)
    end
end
