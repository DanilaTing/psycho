class ChecklistitemsController < ApplicationController
  before_action :set_checklistitem, only: [:show, :edit, :update, :destroy]

  # GET /checklistitems
  # GET /checklistitems.json
  def index
    @checklistitems = Checklistitem.all
    @columns = Column.all
  end

  # GET /checklistitems/1
  # GET /checklistitems/1.json
  def show
    @columns = Column.all
  end

  # GET /checklistitems/new
  def new
    @checklistitem = Checklistitem.new
    @columns = Column.all
  end

  # GET /checklistitems/1/edit
  def edit
    @columns = Column.all
  end

  # POST /checklistitems
  # POST /checklistitems.json
  def create
    @checklistitem = Checklistitem.new(checklistitem_params)

    respond_to do |format|
      if @checklistitem.save
        format.html { redirect_to @checklistitem, notice: 'Checklistitem was successfully created.' }
        format.json { render :show, status: :created, location: @checklistitem }
      else
        format.html { render :new }
        format.json { render json: @checklistitem.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /checklistitems/1
  # PATCH/PUT /checklistitems/1.json
  def update
    respond_to do |format|
      if @checklistitem.update(checklistitem_params)
        format.html { redirect_to @checklistitem, notice: 'Checklistitem was successfully updated.' }
        format.json { render :show, status: :ok, location: @checklistitem }
      else
        format.html { render :edit }
        format.json { render json: @checklistitem.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /checklistitems/1
  # DELETE /checklistitems/1.json
  def destroy
    @checklistitem.destroy
    respond_to do |format|
      format.html { redirect_to checklistitems_url, notice: 'Checklistitem was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_checklistitem
      @checklistitem = Checklistitem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def checklistitem_params
      params.require(:checklistitem).permit(:name, :checklist_id)
    end
end
