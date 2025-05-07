import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseFilters,
  UseGuards,
  Logger,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { DeviceResponseDto } from '@modules/devices/dto/device-response.dto';
import { DevicesService } from '@modules/devices/services/devices.service';
import { CreateDeviceDto } from '@modules/devices/dto/create-device.dto';
import { UpdateDeviceDto } from '@modules/devices/dto/update-device.dto';
import { PaginationQueryDto } from '@modules/devices/dto/pagination-query.dto';
import { FindAllDeviceResponseDto } from '@modules/devices/dto/find-all-device-response.dto';
import { AuthenticatedGuard } from '@/app/global/guards/authenticated.guard';
// import { CONSTANTS } from '@modules/devices/constants/controller.constants';
import { EntityNotFoundFilter } from '@/app/global/errors/entity-not-found.filter';
import { UnauthorizedFilter } from '@/app/global/errors/unauthorized.filter';
import { EntityNotFoundResponseDto } from '@/app/global/dto/entity-not-found.dto';
/**
 * DevicesController
 * @description Handles the Requests / Responses for devices
 * @class
 */
@UseFilters(UnauthorizedFilter)
@Controller({
  path: 'devices',
  version: '1',
})
export class DevicesController {
  private readonly logger = new Logger(DevicesController.name);

  constructor(private readonly devicesService: DevicesService) {}

  // Route Definition:
  @Post()
  // Swagger Documentation:
  @ApiOperation({
    summary: 'Create a new device',
    description: 'Creates a new device with the passed params.',
  })
  @ApiOkResponse({ type: DeviceResponseDto })
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  // Route Definition:
  @Get()
  // Swagger Documentation:
  @ApiOperation({
    summary: 'Get all devices in paginated format.',
    description:
      'Returns a paginated list of all devices registered in the system.',
  })
  @ApiOkResponse({ type: FindAllDeviceResponseDto })
  // Guards:
  @UseGuards(AuthenticatedGuard)
  // Handler:
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.devicesService.findAll(paginationQueryDto);
  }

  // Route Definition:
  @Get(':id')
  // Swagger Documentation:
  @ApiOperation({
    summary: 'Get one device by ID',
    description: 'Returns a device by its ID.',
  })
  @ApiOkResponse({ type: DeviceResponseDto })
  @ApiNotFoundResponse({ type: EntityNotFoundResponseDto })
  // Exception Filters:
  @UseFilters(new EntityNotFoundFilter())
  // Handler:
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(+id);
  }

  // Route Definition:
  @Patch(':id')
  // Swagger Documentation:
  @ApiOperation({
    summary: 'Update one device by ID',
    description: 'Updates a device with the passed params.',
  })
  @ApiOkResponse({ type: DeviceResponseDto })
  @ApiNotFoundResponse({ type: EntityNotFoundResponseDto })
  // Handler:
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  // Route Definition:
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id);
  }
}
