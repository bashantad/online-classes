class NotesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_notebook
  before_action :set_note, only: [:show, :edit, :update, :destroy]

  def index
    @notes = @notebook.notes
  end

  def show
  end

  def new
    @note = @notebook.notes.new
  end

  def edit
  end

  def create
    @note = @notebook.notes.new(note_params.merge(user_id: current_user.id))
    if @note.save
      redirect_to notebook_notes_path(@notebook), notice: 'Note was successfully created.'
    else
      render :new
    end
  end

  def update
    if @note.update(note_params)
      redirect_to notebook_notes_path(@notebook), notice: 'Note was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @note.destroy
    redirect_to notebook_notes_path(@notebook), notice: 'Note was successfully deleted.'
  end

  private
    def set_note
      @note = @notebook.notes.find(params[:id])
    end

    def set_notebook
      @notebooks = current_user.notebooks.order("created_at DESC")
      @all_notes = current_user.notes
      @notebook = current_user.notebooks.find(params[:notebook_id])
    end

    def note_params
      params.require(:note).permit(:title, :description)
    end
end
