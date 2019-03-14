class React::ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]

  # GET /projects
  # GET /projects.json
  def index
    @user = current_user
    @are_projects = true

    if user_signed_in?
      @boards = @user.boards.as_json(include: { columns: {
                                                include: { cards: {
                                                           only: [:id, :name, :description, :project_id, :type],
                                                           include: { card_in_columns: {
                                                                      include: { card: {
                                                                                 only: [:id, :name, :description, :project_id, :type],
                                                                      } }
                                                           } }
                                                         }}
      } })
    end
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
    @user = current_user

    if user_signed_in?
      @project.as_json
      @boards = @project.boards.as_json(include: { columns: {
                                                include: { cards: {
                                                           only: [:id, :name, :description, :project_id, :type], include: :card_in_columns
                                                         }}
      } })
    end

    # @project.as_json(include: [:tasks, :boards])
    # @boards = Board.all
    # @general_board = Board.find_by(general: true).as_json(include: :columns)
    # @projects_boards = @project.boards.as_json(include: :columns)
    # @inbox_column = Column.find_by(name: 'Inbox')
    # @done_column = Column.find_by(name: 'Done')
    # @card_in_columns = CardInColumn.all
    # @tasks = Card.where(type: 'Task').as_json(only: [:id, :name, :description, :project_id, :type], include: :card_in_columns)
  end

  # GET /projects/new
  def new
    @user = current_user
    @project = Project.new

    if user_signed_in?
      @boards = @user.boards.as_json(include: { columns: {
                                                include: { cards: {
                                                           only: [:id, :name, :description, :project_id, :type], include: :card_in_columns
                                                         }}
      } })
    end
  end

  # GET /projects/1/edit
  def edit
  end

  # POST /projects
  # POST /projects.json
  def create
    @project = Project.new(project_params)

    respond_to do |format|
      if @project.save
        format.html { redirect_to @project, notice: 'Project was successfully created.' }
        format.json { render :show, status: :created, location: @project }
      else
        format.html { render :new }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /projects/1
  # PATCH/PUT /projects/1.json
  def update
    respond_to do |format|
      if @project.update(project_params)
        format.html { redirect_to @project, notice: 'Project was successfully updated.' }
        format.json { render :show, status: :ok, location: @project }
      else
        format.html { render :edit }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.json
  def destroy
    @project.destroy
    respond_to do |format|
      format.html { redirect_to projects_url, notice: 'Project was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
      params.require(:project).permit(:name, :description, :type, card_in_columns_attributes: [:id, :column_id, :card_id])
    end
end
