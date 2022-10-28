package com.ssafy.service;

import com.ssafy.dto.request.OrderUpdateRequest;
import com.ssafy.dto.request.WidgetCreateRequest;
import com.ssafy.dto.request.WidgetUpdateRequest;
import com.ssafy.dto.response.WidgetResponse;
import com.ssafy.entity.Order;
import com.ssafy.entity.Widget;
import com.ssafy.entity.WidgetCode;
import com.ssafy.exception.DuplicateException;
import com.ssafy.exception.NotFoundException;
import com.ssafy.repository.OrderRepo;
import com.ssafy.repository.WidgetCodeRepo;
import com.ssafy.repository.WidgetRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

import static com.ssafy.exception.DuplicateException.WIDGET_DUPLICATED;
import static com.ssafy.exception.NotFoundException.WIDGET_CODE_NOT_FOUND;
import static com.ssafy.exception.NotFoundException.WIDGET_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WidgetServiceImpl implements WidgetService {
    private final WidgetRepo widgetRepo;
    private final WidgetCodeRepo widgetCodeRepo;
    private final OrderRepo orderRepo;

    @Override
    @Transactional
    public List<WidgetResponse> getWidgetList(Long projectId) {
        // TODO : 권한 체크 feign 요청 후 해야함
        Order order = orderRepo.findByProjectId(projectId)
                .orElseGet(()->{
                    Order newOrder = Order.builder()
                            .projectId(projectId)
                            .order("")
                            .build();
                    orderRepo.save(newOrder);
                    return newOrder;
                });
        StringTokenizer st = new StringTokenizer(order.getOrder());
        List<WidgetResponse> responses = new ArrayList<>();
        while(st.hasMoreTokens()){
            Widget widget = widgetRepo.findById(Long.valueOf(st.nextToken()))
                            .orElseThrow(()-> new NotFoundException(WIDGET_NOT_FOUND));
            responses.add(
                WidgetResponse.builder()
                        .id(widget.getId())
                        .name(widget.getName())
                        .widgetCode(widget.getWidgetCode().getId())
                        .requestUrl(widget.getWidgetCode().getRequestUrl())
                        .detailRequestUrl(widget.getWidgetCode().getDetailRequestUrl())
                        .build()
            );
        }
        return responses;
    }

    @Override
    @Transactional
    public WidgetResponse createWidget(WidgetCreateRequest request) {
        WidgetCode widgetCode = widgetCodeRepo.findById(request.getWidgetCodeId())
                .orElseThrow(()-> new NotFoundException(WIDGET_CODE_NOT_FOUND));
        if(widgetRepo.findByProjectIdAndWidgetCode(request.getProjectId(), widgetCode).isPresent()){
            throw new DuplicateException(WIDGET_DUPLICATED);
        }
        Widget widget = Widget.builder()
                .name(request.getName())
                .widgetCode(widgetCode)
                .build();
        widgetRepo.save(widget);
        return WidgetResponse.builder()
                .id(widget.getId())
                .name(widget.getName())
                .widgetCode(widgetCode.getId())
                .requestUrl(widgetCode.getRequestUrl())
                .detailRequestUrl(widgetCode.getDetailRequestUrl())
                .build();
    }

    @Override
    @Transactional
    public WidgetResponse updateWidget(WidgetUpdateRequest request, Long widgetId) {
        Widget widget = widgetRepo.findById(widgetId)
                .orElseThrow(()-> new NotFoundException(WIDGET_NOT_FOUND));
        widget.update(request.getName());
        return WidgetResponse.builder()
                .id(widget.getId())
                .name(widget.getName())
                .widgetCode(widget.getWidgetCode().getId())
                .requestUrl(widget.getWidgetCode().getRequestUrl())
                .detailRequestUrl(widget.getWidgetCode().getDetailRequestUrl())
                .build();
    }

    @Override
    @Transactional
    public void updateOrder(OrderUpdateRequest request) {
        Order order = orderRepo.findByProjectId(request.getProjectId())
                .orElseGet(()->{
                    Order newOrder = Order.builder()
                            .projectId(request.getProjectId())
                            .order("")
                            .build();
                    orderRepo.save(newOrder);
                    return newOrder;
                });
        order.update(request.getOrder());
    }

    @Override
    @Transactional
    public void deleteWidget(Long widgetId) {
        Widget widget = widgetRepo.findById(widgetId)
                .orElseThrow(() -> new NotFoundException(WIDGET_NOT_FOUND));
        widgetRepo.delete(widget);
    }

    @Override
    @Transactional
    public void deleteAllWidget(Long projectId) {
        widgetRepo.deleteAll(widgetRepo.findByProjectId(projectId));
        orderRepo.deleteByProjectId(projectId);
    }
}
