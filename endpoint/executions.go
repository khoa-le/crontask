package endpoint

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/khoa-le/crontask/models"
	"github.com/jinzhu/gorm"
)

//ExecutionCreate serves the route POST /tasks/:task_id/executions
func ExecutionCreate(c *gin.Context) {
	models.InTx(func(txn *gorm.DB) bool {
		var task models.Task
		if txn.Where("id like ? ", c.Param("task_id")).First(&task); task.ID == "" {
			c.JSON(http.StatusNotFound, "")
			return false
		}
		var execution models.Execution
		if err := c.BindJSON(&execution); err != nil {
			c.JSON(http.StatusBadRequest, err)
			return false
		}
		execution.TaskID = task.ID
		if valid, errMap := models.ValidStruct(&execution); !valid {
			c.JSON(http.StatusConflict, errMap)
			return false
		}
		if txn.Create(&execution).Error != nil {
			c.JSON(http.StatusBadRequest, "Execution can't be saved")
			return false
		}
		c.JSON(http.StatusOK, execution)
		return true
	})
}

//ExecutionList serves the route GET /tasks/:task_id/executions?page=0&size=10
func ExecutionList(c *gin.Context) {
	var executions []models.Execution
	page, _ := strconv.Atoi(c.Param("page"))
	size, _ := strconv.Atoi(c.Param("size"))
	if size == 0 {
		size = models.ExecutionPageSize
	}
	offset := page * models.ExecutionPageSize
	models.Gdb.Where("task_id like ?", c.Param("task_id")).Order("created_at desc").Offset(offset).Limit(size).Find(&executions)
	c.JSON(http.StatusOK, executions)
}
