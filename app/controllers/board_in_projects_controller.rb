class BoardInProjectsController < ApplicationController
  before_action :set_board_in_project, only: [:show, :edit, :update, :destroy]

  # GET /board_in_projects
  # GET /board_in_projects.json
  def index
    @board_in_projects = BoardInProject.all
  end

  # GET /boards/1
  # GET /boards/1.json
  def show

  end

  # GET /boards/new
  def new
    @board_in_project = BoardInProject.new
  end

  # GET /boards/1/edit
  def edit
  end

  def new_board_in_project
    @board_in_project = BoardInProject.new

    respond_to do |format|
      format.js { render :newBoardInProject }
    end
  end

  # POST /boards
  # POST /boards.json
  def create
    @board_in_project = BoardInProject.new(board_in_project_params)

    respond_to do |format|
      if @board_in_project.save
        format.html { redirect_to @board_in_project, notice: 'Video was successfully created.' }
        format.json { render :show, status: :created, location: @board_in_project }
        format.js { render :newBoardInProject }
      else
        format.html { render :new }
        format.json { render json: @board_in_project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /board_in_projects/1
  # PATCH/PUT /board_in_projects/1.json
  def update
    respond_to do |format|
      if @board_in_project.update(board_in_project_params)

      else

      end
    end
  end

  # DELETE /boards/1
  # DELETE /boards/1.json
  def destroy
    @board_in_project.destroy
    respond_to do |format|
      format.html { redirect_to board_in_projects_url, notice: 'Board was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_board_in_project
      @board_in_project = BoardInProject.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def board_in_project_params
      params.require(:board_in_project).permit(:project_id, :board_id)
    end
end
